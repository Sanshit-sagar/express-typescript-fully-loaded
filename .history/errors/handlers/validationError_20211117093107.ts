

     let errors = Object.values(err.errors).map(el => el.message);
     let fields = Object.values(err.errors).map(el => el.path);
     let code = 400;