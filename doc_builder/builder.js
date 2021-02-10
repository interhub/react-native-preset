/* eslint-disable no-useless-escape */
/* eslint-disable-next-line no-undef */
const fs = require('fs')
let result = ''

const allow_extensions = ['ts', 'tsx'] //допустимые расширения
const includes = ['App', 'src'] //файлы и папки которые нужно включить


const IS_COMMENTS = false //включить если нужно собрать только комментарии
const regexp = /((["'])(?:\\[\s\S]|.)*?\2|\/(?![*\/])(?:\\.|\[(?:\\.|.)\]|.)*?\/)|\/\/.*?$|\/\*[\s\S]*?\*\//gm //регулярка для комментариев

async function scanner_files(y) {
    if (!includes.some((dir) => y.includes(dir)) && y !== '../' && y !== '../App.tsx') { //заменить или удалить App.tsx если нету файла вхождения
        return
    }
    let y1 = fs.readdirSync(y)
    for (let x of y1) {
        let stat = fs.statSync(y + '/' + x) // тут забыли путь

        if (!stat.isFile()) {
            let path = y + '/' + x
            await scanner_files(path)
        } else {
            const file_path = y + '/' + x
            fs.readFile(file_path, (err, res) => {
                if (allow_extensions.some((ends) => file_path.endsWith(ends))) {
                    const str = res.toString()
                    result += str
                    console.log(x)
                    fs.appendFileSync(IS_COMMENTS ? 'comments.txt' : './result.tsx', `\n/*****FILE ${x} *****/ \n` + (IS_COMMENTS ? str.match(regexp) : str) + '\n\n')
                }
            })
        }
    }
}


scanner_files('../') //путь к файлу или папке для старта


/**
 * для запуска необходимо установить node js
 * и запустить файл из консоли script : node builder.js
 * в результате сформируется файл в текущей директории
 * result.tsx или comment.txt
 */
