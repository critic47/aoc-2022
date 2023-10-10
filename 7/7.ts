const input = (await Deno.readTextFile('./7/7.input.txt')).split('\n')

type File = {
  size: number
}
type Directory = {
  content: { [name: string]: File | Directory }
  parent: Directory | undefined
}

const fileTree = {
  content: {},
  parent: undefined,
}
let cwd: Directory = fileTree

for (const line of input) {
  const [cmd, ...rest] = line.split(' ')

  if (cmd === '$') {
    if (rest[0] === 'cd') {
      const dirName = rest[1]
      if (dirName === '..') {
        cwd = cwd.parent as Directory
      } else if (dirName === '/') {
        cwd = fileTree
      } else {
        if (!cwd.content[dirName]) {
          cwd.content[dirName] = { parent: cwd, content: {} }
        }
        cwd = cwd.content[dirName] as Directory
      }
    }
  } else if (cmd !== 'dir') {
    cwd.content[rest[0]] = {
      size: parseInt(cmd),
    }
  }
}
const dirSizes: number[] = []

const dirSize = (dir: Directory): number => {
  let size = 0

  for (const fileOrDir in dir.content) {
    const content = dir.content[fileOrDir]
    if ('size' in content) {
      size += content.size
    } else {
      size += dirSize(content)
    }
  }

  dirSizes.push(size)

  return size
}
dirSize(fileTree)

const toDeleteSize = Object.values(dirSizes)
  .filter((s) => s <= 100000)
  .reduce((acc, size) => acc + size, 0)
console.log(toDeleteSize)

// part b
dirSizes.sort((a, b) => a - b)
const spaceToFree = 30000000 - (70000000 - dirSizes[dirSizes.length - 1])
const toDelete = dirSizes.find((s) => s > spaceToFree)
console.log(spaceToFree, toDelete)
