import multer from "multer"

const storage  = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/temp") // null for error handling, cb stands for callback
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // change its name from original name as multiple file of same name can replace each other
    }
})

export  const upload = multer({storage: storage})