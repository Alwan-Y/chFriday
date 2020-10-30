import fs from 'fs'
import path from 'path'
import data from '../../data/data.json'

const filePath = path.resolve(__dirname, '../../data/data.json')

class PostController {
  static get = (req, res) => {
    let filteredData = data
    const { title, sort } = req.query

    // Sort
    if (sort) {
      filteredData.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))

      if (sort === 'desc') {
        filteredData.reverse()
      }
    }

    // Search by title
    if (title) {
      filteredData = filteredData.filter((elm) => elm.title.toLowerCase().includes(title))
    }

    return res.status(200).json({ data: filteredData })
  }

  static getIndexView = (req, res) => {
    res.render('posts/index')
  }

  static create = (req, res) => {
    const { id } = req.body
    const post = data.find((obj) => obj.id === parseInt(id, 10))

    if (post) {
      return res.status(400).json({ message: 'id is already exist' })
    }

    data.push(req.body)

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(201).json({ message: `Successfully saved on ${filePath}` }),
    )
  }

  static update = (req, res) => {
    const { id }  = req.params
    const bookData = req.body
    console.log(id)
    console.log(req.body)

    const getBooksData = () => {
      const filePath = path.resolve(__dirname, '../../data/data.json')
      const jsonData = fs.readFileSync(filePath)
  
      return JSON.parse(jsonData)
  }

    const existBooks = getBooksData()
    const findExist = existBooks.find( book => book.id == id)

    if(!findExist){
        return res.status(400).send({error: 'ID not exist'})
    }

    const updatePost = existBooks.filter(book => book.id != id)


    updatePost.push(bookData)

    const saveBookData = (data) => {
      const stringifyData = JSON.stringify(data)
      const filePath = path.resolve(__dirname, '../../data/data.json')
  
      fs.writeFileSync(filePath, stringifyData)
  }

    saveBookData(updatePost)

    res.send({ success: 'Book data updated successfully'})
  }

  static delete = (req, res) => {
    const { id } = req.params
    const post = data.find((obj) => obj.id === parseInt(id, 10))

    if (!post) {
      return res.status(404).json({ message: '404! Id is not exist.' })
    }

    // Alternative 1
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id === parseInt(id, 10)) {
        data.splice(i, 1)
      }
    }

    // Alternative 2
    // data.splice(data.indexOf(post), 1)

    return fs.writeFile(
      filePath,
      JSON.stringify(data),
      'utf-8',
      () => res.status(200).json({ message: `Successfully delete data with id:${id} on ${filePath}` }),
    )
  }
}

export default PostController
