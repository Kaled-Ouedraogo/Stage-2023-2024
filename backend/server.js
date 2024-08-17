const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')
const { UserModel , ProductModel, SupplierModel, CategoryModel, SubCategoryModel,CartModel, OrderModel} = require('./models/Models');
const bcrypt = require('bcrypt');
const path = require('path');



const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/components/Assets/uploads') // Répertoire de stockage des images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Nom du fichier
    }
});

const upload = multer({ storage: storage });

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/stage")

//CREATE AN ACCOUNT
app.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        //EXISTING EMAIL
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash du password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //ADD DATA
        const createdUser = new UserModel({
            username: req.body.username,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        const savedProduct = await createdUser.save();
        res.status(201).json({success: true, data:savedProduct});
    } catch (error) {
        console.error("Error during employee registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//LOG IN TO ACCOUNT
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur dans la base de données
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "Email not found" });
        }

        // Comparaison du mot de passe fourni avec le hash stocké dans la base de données
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Password incorrect" });
        }

        // Authentification réussie
        return res.status(200).json({ message: "Login successful", userInfo: { username: user.username, email: user.email, role: user.role,} });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//get data
app.get("/admin/all-product",async(req,res)=>{
    const data = await ProductModel.find({})
    const { q } =req.query;

    const keys = ["name"];

    const search = (data) =>{
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
        );
    };

    if (q) res.send({success: true, data:search(data)})

    else res.send({success: true, data:data})
    //


})

//get one product data
app.get("/admin/product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

//create data
app.post("/admin/add-product", upload.array('images', 5), async (req, res) => {
    try {
        const { code, name, email, category, subcategory } = req.body;
        let productList = await ProductModel.find({ email: email });
        let newCode = code;
        let existingCode = productList.find(product => product.code === newCode);
        let existingProduct = productList.find(product => product.name === name && product.category===category && product.subcategory===subcategory);
        while (existingCode) {
            newCode++;
            existingCode = productList.find(product => product.code === newCode);
        }
        if(existingProduct) {
            res.status(403).json({ error: "product already exists" });
        }
        else{
            console.log(req.body); // Affiche les données du formulaire
            const imagePaths = req.files.map(file => file.path);
            req.body.images = imagePaths; // Ajoutez les chemins des images à l'objet req.body

            // Créez un nouvel objet de produit avec les données du formulaire et les chemins des images
            const newProduct = new ProductModel({
                code: newCode,
                name: req.body.name,
                category: req.body.category,
                subcategory: req.body.subcategory,
                price: req.body.price,
                purchasePrice: req.body.purchasePrice,
                sellPrice: req.body.sellPrice,
                tva:req.body.tva,
                description: req.body.description,
                quantity: req.body.quantity,
                images: imagePaths,
                email: req.body.email,
                storeName:req.body.storeName,
            });

            // Enregistrez le nouveau produit dans la base de données
            const savedProduct = await newProduct.save();
            //const updateCategory = await CategoryModel.updateOne({libelle:category}, { $inc: { productnum: 1 } });
            //const updateSubCategory = await SubCategoryModel.updateOne({libelle:subcategory}, { $inc: { productnum: 1 } });



            // Répondez avec succès et renvoyez le produit enregistré
            res.status(201).json({ success: true, message: "Product added", data: savedProduct });
        }


    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//update data
app.put("/admin/edit-product", async(req,res)=>{
    console.log(req.body)

    const {id,...rest} =req.body
    console.log(rest)
    const data = await ProductModel.updateOne({_id : id},rest)
    res.send({success:true, message: "Product Updated", data:data})
})

//delete data
app.delete("/admin/delete-product/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await ProductModel.deleteOne({_id : id})
    res.send({success:true, message: "Product Deleted", data:data})

})

const uploadsDir = path.join(__dirname, '../frontend/src/components/Assets/uploads');
app.use('/uploads', express.static(uploadsDir));



//AJOUTER FOURNISSEUR
app.post('/admin/add-users', async (req, res) => {
    try {
        console.log(req.body);
        const { code, libelle, address, tel, fax, email } = req.body;
        let newCode = code;
        let existingCode = await SupplierModel.findOne({ code: newCode });
        while (existingCode) {
            newCode++;
            existingCode = await SupplierModel.findOne({ code: newCode });
        }

        //ADD DATA
        const createdSupplier = new SupplierModel({
            code: newCode,
            address: address,
            libelle: libelle,
            tel: tel,
            fax: fax,
            email: email
        });
        const savedSupplier = await createdSupplier.save(); // Utilisez createdSupplier.save() au lieu de savedSupplier.save()
        console.log(savedSupplier)
        // Retournez la réponse avec le fournisseur créé
        res.status(201).json({ message: "Supplier added successfully", supplier: savedSupplier });
    } catch (error) {
        console.error("Error during supplier registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/admin/all-users", async (req,res) =>{
    const data = await SupplierModel.find({})
    res.send({success: true, data:data})
})

app.get("/admin/all-suppliers", async (req,res) =>{
    try {
        const { q } =req.query;
        const data = await SupplierModel.find({});
        const dataFilter = (data) =>{
            return data.filter((item) => item.status === Number(q));
        };
        //res.status(200).json({ success: true, data:dataFilter(data)});
        if (q)
        {
            if (Number(q)!==0 && Number(q)!==1) res.send({success: true, data:data})
            else res.send({success: true, data:dataFilter(data)})
        }
        else res.send({success: true, data:data})
    } catch (error) {
        console.error("Error bad request:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
})

app.get("/admin/one-supplier/:id", async (req, res) => {
    try {
        const q = req.params.id;
        const data = await SupplierModel.find({});
        const dataFilter = (data) =>{
            return data.filter((item) => item.email === q);
        };
        res.status(200).json({ success: true, data:dataFilter(data)});
    } catch (error) {
        console.error("Error bad request:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});


app.put('/admin/update-supplier-status/:id',async(req,res) =>{
    const id = req.params.id
    const temp = await SupplierModel.find({_id:id})
    const data = await SupplierModel.updateOne({_id : id}, {status: 1})

    const data_next = await UserModel.updateOne({email:temp[0].email}, {role: 1})

    res.send({success:true, message: "Status Updated", data:data})
})

app.put('/admin/update-order-status-confirm/:id',async(req,res) =>{
    const id = req.params.id
    const temp = await OrderModel.find({_id:id})
    const data = await OrderModel.updateOne({_id:id}, {status: "Terminée"})
    res.send({success:true, message: "Status Updated", data:data})
})
app.put('/admin/update-order-status-cancel/:id',async(req,res) =>{
    const id = req.params.id
    const temp = await OrderModel.find({_id:id})
    const data = await OrderModel.updateOne({_id:id}, {status: "Annulée"})
    res.send({success:true, message: "Status Updated", data:data})
})
//CLIENT
app.get("/one-user", async (req,res) =>{
    const { q } =req.query;
    const data = await UserModel.find({})
    const dataFilter = (data) =>{
        return data.filter((item) => item.email === q);
    };
    res.send({success: true, data:dataFilter(data)})
})

app.get("/all-clients", async (req,res) =>{
    const data = await UserModel.find({})
    res.send({success: true, data:data})
})

//supprimer client
app.delete("/admin/delete-client/:id",async(req,res)=>{
    const id = req.params.id
    const data = await UserModel.deleteOne({_id : id})
    res.send({success:true, message: "Users Deleted", data:data})
})
app.delete("/admin/delete-supplier/:id",async(req,res)=>{
    const id = req.params.id
    const data = await SupplierModel.deleteOne({_id : id})
    res.send({success:true, message: "Suppliers Deleted", data:data})
})

//AJOUTER CATEGORIE
app.post('/admin/add-category', async (req, res) => {
    try {
        console.log(req.body);
        const { code, libelle, email } = req.body;
        let categoryList = await CategoryModel.find({ email: email });
        let newCode = code;
        let existingCode = categoryList.find(category => category.code === newCode);
        let existingCategory = categoryList.find(category => category.libelle === libelle);
        while (existingCode) {
            newCode++;
            existingCode = categoryList.find(category => category.code === newCode);
        }
        if(existingCategory) {
            res.status(403).json({ error: "category already exists" });
        }
        //ADD DATA
        else{
            const savedCategory = await CategoryModel.create({
                code: newCode,
                libelle: libelle,
                email: email
            });
            console.log(savedCategory);
            res.status(201).json({ message: "Category added successfully", category: savedCategory });
        }

    } catch (error) {
        console.error("Error during category creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/admin/all-categories", async (req,res)=>{
    const { q } =req.query;

    const data = await CategoryModel.find({});
    const keys = ["libelle"];

    const search = (data) =>{
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
        );
    };

    if (q) res.send({success: true, data:search(data)})
    else res.send({success: true, data:data})
})

app.delete("/admin/delete-category/:id",async(req,res)=>{
    const id = req.params.id
    const data = await CategoryModel.deleteOne({_id : id})
    res.send({success:true, message: "Category Deleted", data:data})
})

//AJOUTER SOUS CATEGORIE
app.post('/admin/add-subcategory', async (req, res) => {
    try {
        console.log(req.body);
        const { code, libelle, category, email } = req.body;
        let subCategoryList = await SubCategoryModel.find({ category: category });
        let newCode = code;
        let existingCode = subCategoryList.find(category => category.code === newCode);
        let existingSub = subCategoryList.find(subCategory => subCategory.libelle === libelle);
        while (existingCode) {
            newCode++;
            existingCode = subCategoryList.find(category => category.code === newCode);
        }
        if(existingSub) {
            res.status(403).json({ error: "Subcategory already exists" })
        }
        else{
            const savedSub = await SubCategoryModel.create({
                code: newCode,
                libelle: libelle,
                category: category,
                email: email
            });
            //const updateCategory = await CategoryModel.updateOne({libelle:category}, { $inc: { subnum: 1 } });



            console.log(savedSub);
            res.status(201).json({success: true, message: "SubCategory added successfully", category: savedSub });
        }



    } catch (error) {
        console.error("Error during subcategory creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/admin/all-subcategories", async (req,res)=>{
    const { q } = req.query;

    const data = await SubCategoryModel.find({});

    const keys = ["libelle"];

    const search = (data) =>{
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
        );
    };
    if (q) res.send({success: true, data:search(data)})
    else res.send({success: true, data:data})
})

app.delete("/admin/delete-subcategory/:id",async(req,res)=>{
    const id = req.params.id
    const data = await SubCategoryModel.deleteOne({_id : id})
    res.send({success:true, message: "SubCategory Deleted", data:data})
})
//ADD TO CART
app.post("/add-to-cart", async (req,res)=>{
    try{
        console.log(req.body);
        const { code, userEmail } = req.body;
        let newCode = code;
        let shoppingCartList = await CartModel.find({ userEmail: userEmail });
        let existingCode = shoppingCartList.find(cart => cart.code === newCode);
        while (existingCode) {
            newCode++;
            existingCode = shoppingCartList.find(cart => cart.code === newCode);
        }
        const savedCart = await CartModel.create({
            code: newCode,
            userEmail: req.body.userEmail,
            products: {
                productId: req.body.productId,
                productName: req.body.productName,
                quantity: req.body.quantity,
                price: req.body.price,
                storeName: req.body.storeName,
            },
            totalPriceTTC : req.body.totalPriceTTC,
            totalPriceTHT : req.body.totalPriceTHT,
            totalPriceTVA : req.body.totalPriceTVA,
            totalQuantity : req.body.totalQuantity,
            //address: req.body.address,
        });
        console.log(savedCart);
        res.status(201).json({success:true, message: "ShoppingCart created successfully" });

    }catch(error){
        console.log(req.body.productName)
        console.error("Error during ShoppingCart creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }

})

app.put("/add-to-cart/:id", async (req, res) => {
    try {
        const  cartId  = req.params.id;
        const updatedCartItem = req.body;


        const cartItem = await CartModel.findById(cartId);

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        const existingProductIndex = cartItem.products.findIndex(product => product.productId === updatedCartItem.productId);
        if (existingProductIndex>=0) {
            cartItem.products[existingProductIndex].quantity += updatedCartItem.quantity;
            cartItem.products[existingProductIndex].price += updatedCartItem.price;
        } else {
            // Si le produit n'existe pas, ajouter un nouveau produit à la liste des produits
            cartItem.products.push({
                productId: updatedCartItem.productId,
                productName: updatedCartItem.productName,
                quantity: updatedCartItem.quantity,
                price: updatedCartItem.price,
                storeName: req.body.storeName,
            });
            cartItem.totalQuantity += 1;
        }

        // Mise à jour des totaux du panier
        cartItem.totalPriceTTC += updatedCartItem.totalPriceTTC;
        cartItem.totalPriceTHT += updatedCartItem.totalPriceTHT;
        cartItem.totalPriceTVA += updatedCartItem.totalPriceTVA;


        // Enregistrement du panier mis à jour
        const updatedCart = await cartItem.save();

        res.json({ success: true, message: "Cart item updated successfully", data: updatedCart });
    } catch (error) {
        console.error("Error during updating cart item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/update-cart/:id", async (req,res)=>{
    try {
        const  cartId  = req.params.id;
        const updatedCartItem = req.body;
        const cartItem = await CartModel.findById(cartId);

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }


        // Mise à jour des totaux du panier
        cartItem.totalPriceTTC -= updatedCartItem.totalPriceTTC;
        cartItem.totalPriceTHT -= updatedCartItem.totalPriceTHT;
        cartItem.totalPriceTVA -= updatedCartItem.totalPriceTVA;


        // Enregistrement du panier mis à jour
        const updatedCart = await cartItem.save();

        res.json({ success: true, message: "Cart item updated successfully", data: updatedCart });
    } catch (error) {
        console.error("Error during updating cart item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/add-to-cart", async (req,res)=>{
    const { q } = req.query;

    const data = await CartModel.find({});
    const dataFilter = (data) =>{
        return data.filter((item) => item.userEmail === q);
    };
    if (q) res.send({success: true, data:dataFilter(data)})
    else res.send({success: true, data:data})
})


app.delete("/add-to-cart/:id/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const cartId = req.params.id;
        const cartItem = await CartModel.findById(cartId);
        console.log(productId)
        console.log("second"+cartId)

        // Trouver l'index de l'élément dans le tableau products
        const itemIndex = cartItem.products.findIndex(product => product.productId === productId);

        if (itemIndex !== -1) {
            // Si l'élément est trouvé, le supprimer du tableau
            cartItem.products.splice(itemIndex, 1);
            cartItem.totalQuantity--;
            await cartItem.save(); // Enregistrer les modifications dans la base de données
            res.json({ success: true, message: "Product Deleted" });
        } else {
            // Si l'élément n'est pas trouvé dans le tableau
            res.status(404).json({ error: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error during deleting item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GESTION DES COMMANDES
app.post("/add-order", async (req,res)=>{
    try{
        const { code, userEmail } = req.body;
        let newCode = code;
        let OrderList = await OrderModel.find({ userEmail: userEmail });
        let existingCode = OrderList.find(cart => cart.code === newCode);
        while (existingCode) {
            newCode++;
            existingCode = OrderList.find(cart => cart.code === newCode);
        }
        const savedOrder = await OrderModel.create({
            code: newCode,
            userEmail: req.body.userEmail,
            shoppingCartId: req.body.shoppingCartId,
            orderDate: new Date("2024-05-10"),
            deliveryDate: null,
            name: req.body.name,
            tel:req.body.tel,
            region: req.body.region,
            ville: req.body.ville,
            address:req.body.address,
            paymentMethod: req.body.paymentMethod,
        });
        const cartItem = await CartModel.findById(req.body.shoppingCartId);
        cartItem.status = "validate";
        const updatedCart = await cartItem.save();
        console.log(savedOrder);
        console.log("received :"+req.body.shoppingCartId)
        res.status(201).json({success:true, message: "Order created successfully" });

    }catch(error){
        console.log(req.body.productName)
        console.error("Error During Order creation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get("/all-orders", async (req,res)=>{
    const { q } = req.query;
    const data = await OrderModel.find({});
    const dataFilter = (data) =>{
        return data.filter((item) => item.userEmail === q);
    };
    if (q) res.send({success: true, data:dataFilter(data)})
    else res.send({success: true, data:data})
})

app.listen(3001, () =>{
    console.log("Server is running")
})