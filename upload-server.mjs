// 图片上传服务：接收浏览器上传的图片，保存到 weekly-report/Pic 目录
// 运行方式：node upload-server.mjs  或  由 package.json 的 dev 脚本自动拉起
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PIC_DIR = path.join(__dirname, 'Pic')
const PROJECTS_JSON = path.join(__dirname, 'public', 'data', 'projects.json')

// 确保 Pic 目录存在
if (!fs.existsSync(PIC_DIR)) {
  fs.mkdirSync(PIC_DIR, { recursive: true })
}

// 安全文件名：保留扩展名，去掉路径，避免越位写入
function safeFilename(originalName) {
  const ext = path.extname(originalName) || '.png'
  const base = path.basename(originalName, ext)
    .replace(/[^a-z0-9\u4e00-\u9fa5_\-]/gi, '_')  // 保留中文、字母、数字、下划线、连字符
    .slice(0, 80)
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  return `${base}-${stamp}${ext}`
}

// 从 multipart/form-data 中解析出文件内容
function parseMultipart(body, boundary) {
  const parts = body.split(`--${boundary}`)
  for (const part of parts) {
    if (!part.includes('filename=') && !part.includes('Content-Disposition')) continue
    const nameMatch = part.match(/name="([^"]+)"/)
    const fileNameMatch = part.match(/filename="([^"]*)"/)
    const typeMatch = part.match(/Content-Type: ([^\r\n]+)/)
    if (!nameMatch) continue
    const fieldName = nameMatch[1]
    // 文件数据起始位置：跳过头部到 \r\n\r\n
    const headerEnd = part.indexOf('\r\n\r\n')
    if (headerEnd === -1) continue
    let fileData = part.slice(headerEnd + 4)
    // 去掉末尾的 \r\n 以及最后的 --
    fileData = fileData.replace(/\r\n--\r\n$/, '').replace(/\r\n$/, '')
    if (fileNameMatch && fileNameMatch[1]) {
      return {
        field: fieldName,
        filename: fileNameMatch[1],
        contentType: typeMatch ? typeMatch[1].trim() : 'image/png',
        data: fileData,
      }
    }
  }
  return null
}

// 主请求处理
function handleRequest(req, res) {
  // CORS：同域下 Vite 代理调用，这里也允许本域访问
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  // 健康检查
  if (req.method === 'GET' && (req.url === '/api/upload/health' || req.url === '/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ ok: true, picDir: PIC_DIR }))
    return
  }

  // 上传图片：POST /api/upload
  if (req.method === 'POST' && req.url === '/api/upload') {
    const chunks = []
    let total = 0
    const MAX_BYTES = 20 * 1024 * 1024 // 20MB

    req.on('data', (chunk) => {
      total += chunk.length
      if (total > MAX_BYTES) {
        res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: false, error: '文件过大，最大 20MB' }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })

    req.on('end', () => {
      try {
        const contentType = req.headers['content-type'] || ''
        const boundaryMatch = contentType.match(/boundary=([^;]+)/)
        if (!boundaryMatch) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, error: 'Content-Type 缺少 boundary' }))
          return
        }
        const boundary = boundaryMatch[1].trim()
        const body = Buffer.concat(chunks)
        const fileInfo = parseMultipart(body.toString('binary'), boundary)

        if (!fileInfo || !fileInfo.data) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' })
          res.end(JSON.stringify({ ok: false, error: '未找到文件内容' }))
          return
        }

        const fileName = safeFilename(fileInfo.filename || 'upload.png')
        const filePath = path.join(PIC_DIR, fileName)
        fs.writeFileSync(filePath, Buffer.from(fileInfo.data, 'binary'))

        const urlPath = `./Pic/${fileName}`
        console.log(`[upload-server] 已保存: ${filePath} 大小: ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`)

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: true, url: urlPath, filename: fileName }))
      } catch (err) {
        console.error('[upload-server] 保存失败:', err)
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
        res.end(JSON.stringify({ ok: false, error: String(err.message || err) }))
      }
    })

    req.on('error', (err) => {
      console.error('[upload-server] 请求错误:', err)
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ ok: false, error: String(err.message || err) }))
    })
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify({ ok: false, error: 'Not Found' }))
}

// 允许被其他文件 import 调用，也支持直接运行
if (import.meta.url === `file://${process.argv[1]}`) {
  const port = process.env.UPLOAD_PORT || 3001
  const server = http.createServer(handleRequest)
  server.listen(port, () => {
    console.log(`[upload-server] 图片上传服务启动于 http://localhost:${port}`)
    console.log(`[upload-server] 保存目录: ${PIC_DIR}`)
  })
}

export { handleRequest, PIC_DIR, PROJECTS_JSON }
