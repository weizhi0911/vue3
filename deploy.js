const shell = require('shelljs')

const argv = process.argv

const ml = '_build'

if (!shell.test('-d', ml)) {
    shell.mkdir(ml)
}

if (!shell.test('-d', `${ml}/.git`)) {
    console.log('开始复制.git ...')
    shell.cp('-r', './.git', `./${ml}/`)
    console.log('复制.git 完成')
}

console.log('开始打包 ...')
if(shell.exec(`yarn ${argv[2]}`).code !== 0) {
    shell.exit(0)
}
console.log('打包完成')

shell.cd(ml)
const {stdout} = shell.pwd()
if (!stdout.includes(ml)) {
    console.log(`error: 没有进入到${ml}`)
    shell.exit(1)
}

console.log(`正在切换分支到${argv[2]}`)
const {code, stderr} = shell.exec(`git checkout ${argv[2]}`)
if (code !== 0) {
    new Error(stderr)
    shell.exit(1)
}
const branch = shell.exec('git rev-parse --abbrev-ref HEAD').stdout
console.log(`已切换到分支：${branch}`)

shell.exec('git pull')

console.log('正在删除旧的dist文件...')
shell.ls().forEach((file) => {
    shell.rm('-rf', file)
})
console.log('旧的dist文件删除完成')

console.log('开始复制dist ...')
shell.cp('-r', '../dist/*', './')
console.log('复制dist 完成')

shell.exec('git pull')

shell.exec('git add .')

if (argv[3]) {
    shell.exec(`git commit -m "${argv[3]}"`)
} else {
    shell.exec('git commit -m "deploy"')
}

shell.exec('git push origin')

console.log('执行完成')