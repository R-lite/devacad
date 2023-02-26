import bookModel from "./books.model.js";

const findBook = async (reqBody, res) => {
    try {
        const queriedBook = await bookModel.find({});
        
        res.status(200).json(queriedBook);
    } catch (err) {
        res.status(500).json(err)
    }
    
}

const addNewBook = async(reqBody, res) => {
    try {
        const {
            title,
            author,
            course_code,
            department,
            faculty
        } = reqBody;

        const newBook = new bookModel({
            title,
            author,
            course_code,
            department,
            faculty
        })

        const savedBook = await newBook.save();

        res.status(201).json(savedBook);

    } catch (err) {
        res.status(500).json(err);
    }
}


export { findBook, addNewBook };