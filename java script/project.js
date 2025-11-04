fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
.then(response=>response.json()).then(data =>{
    product = data.categories;
    console.log(product);
       products.map((product) => {
                document.getElementById('container').innerHTML+=`<h4>${product.strCategory}</h4>`

            })

        }).catch(error => console.log('Error: data is not available')
        )