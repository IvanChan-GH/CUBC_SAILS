module.exports = {
    showCategory:  async function (req, res) {
        // var bkmodel = await Book.find();
        // var mmodel = await Material.find();
        // var pmodel = await PerformanceObserverEntryList.find();
        
        // console.log(model)
    
        // if (req.method == 'GET') return res.view ('category/category', { boardgames: null , books: null , materials: null, presents: null});
    return res.view("category/category")
    
    }
    }