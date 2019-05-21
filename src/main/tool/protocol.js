const AdmZip = require('adm-zip')
const fs = require('fs')
const exec = require('child_process').exec
var parseString = require('xml2js').parseString

// parseXml('./test.docx').then(data => {
// })

function parseXml(filePath) {
  const zip = new AdmZip(filePath)
  const zipEntries = zip.getEntries()
  return start(
    zipEntries
      .find(item => item.name === 'document.xml')
      .getData()
      .toString('utf8')
  ).then(data => {
    return data
  })
}

function start(data) {
  const p = new Promise((resolve, reject) => {
    parseString(data, function(err, result) {
      const bodys = result['w:document']['w:body']
      if (err) reject(err)
      resolve(
        bodys.map(item => {
          return analysisBody(item)
        })
      )
    })
  })
  return p
}
/**
 *解析body
 *
 * @param {*} body
 */

function analysisBody(body) {
  // const ws = fs.createWriteStream('data.vue')
  let temStr = `<template><div>`
  const ps = body['w:p']

  // ws.write(`<template><div>`)
  ps.forEach(ptag => {
    if (ptag['w:r']) {
      // ws.write(pList(ptag['w:r']))
      temStr += pList(ptag['w:r'])
    } else {
      // ws.write(`<br>`)
      temStr += `<br>`
    }
  })
  // ws.write(`</div></template>`)
  // ws.end()
  // console.log(temStr)
  temStr += `</div></template>`
  return temStr
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
  let template = `<span style="${color ? `color: #${color};` : ''}${
    b ? 'font-weight: bold;' : ''
  }${u ? 'text-decoration: underline;' : ''}">${text && text}</span>`
  return template
}

export default parseXml
