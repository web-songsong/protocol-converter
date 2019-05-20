const AdmZip = require('adm-zip')
const fs = require('fs')
const exec = require('child_process').exec
var parseString = require('xml2js').parseString
const zip = new AdmZip('./test.docx')

zip.extractAllTo('./dist/song', true)
fs.readFile('./dist/song/word/document.xml', 'utf8', (err, data) => {
  if (err) throw err
  parseString(data, function(err, result) {
    const bodys = result['w:document']['w:body']
    bodys.forEach(item => {
      analysisBody(item)
    })
  })
  fs.existsSync('./dist') && exec('rm -rf dist')
})

/**
 *解析body
 *
 * @param {*} body
 */

function analysisBody(body) {
  const ws = fs.createWriteStream('data.vue')
  const ps = body['w:p']
  ws.write(`<template><div>`)
  ps.forEach(ptag => {
    if (ptag['w:r']) {
      ws.write(pList(ptag['w:r']))
    } else {
      ws.write(`<br>`)
    }
  })
  ws.write(`</div></template>`)
  ws.end()
}

/**
 * 解析w:p标签
 *
 * @param {*} p
 */
function pList(p) {
  let tem = ''
  p.forEach(item => {
    tem += item['w:t'] ? textStyle(item) : ''
  })
  return `<p>${tem}</p>`
}

/**
 * 为text添加样式
 *
 * @param {*} lineText
 */
function textStyle(obj) {
  if (!obj['w:t']) return

  let text = obj['w:t'][0]
  if (!(typeof text === 'string')) {
    text = text._ || ''
  }
  const style = obj['w:rPr'] ? obj['w:rPr'][0] : []
  let color = style['w:color'] ? style['w:color'][0]['$']['w:val'] : ''
  const b = !!style['w:b']
  const u = !!style['w:u']
  let template = `<sapn style="${color ? `color: #${color};` : ''}${
    b ? 'font-weight: bold;' : ''
  }${u ? 'text-decoration: underline;' : ''}">${text && text}</sapn>`
  return template
}
