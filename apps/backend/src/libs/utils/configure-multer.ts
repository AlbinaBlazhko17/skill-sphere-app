import multer from 'multer';

export const configureMulter = () => {
  const storage = multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, 'uploads/');
    },
    filename: function (_, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    },
  });

  return multer({ storage });
};
