var SpeciesBox = React.createClass({
    loadFoodFromServer: function(){
        $.ajax({
            url: this.props.url,
            dataType: 'text',
            success: function(data){
                this.setState({data: JSON.parse(data)});
            }.bind(this),
            error: function(xhr, status, err){
                console.err(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function(){
        this.loadFoodFromServer();
    },
    getInitialState: function(){
        return { cart: [], data: []};
    },
    handleAddToCart: function(species){
        var cart = this.state.cart.slice();
        // if cart does not have item with this id
        // then add it by id
        // else increment the quantity
        if(cart[species.id] === undefined){
            species.quantity = 1
            cart[species.id] = species;
        }else{
            cart[species.id].quantity += 1
        }
        // set state
        this.setState({cart:cart});
    },
    handleDeleteSpice: function(id){
        console.log(this.state.cart);
        var cart = this.state.cart.slice();
        delete cart[id];
        this.setState({cart: cart});
    },
    render: function(){
        return (
            <div className="row">
                <SpeciesList onHandleAddToCart={this.handleAddToCart} data={this.state.data}/>
                <CartList  onHandleDeleteSpice={this.handleDeleteSpice} data={this.state.cart} />
            </div>
            );
    }
});


var CartList = React.createClass({
    onSubmit: function(){
        data = this.props.data;
        $.ajax({
            type: "POST",
            url: "http://httpbin.org/post",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                console.log(data.data);
            },
            failure: function(errMsg){
                console.log(JSON.stringify(errMsg));
            }
        })
    },
    render: function(){
        var handleDelete = this.props.onHandleDeleteSpice; 
        return (
            <div className="col-md-2"> 
                {this.props.data.map(function(spice){
                    return <CartNode onHandleDelete={handleDelete} key={spice.id} data={spice} />
                }) }
                <input  />
                <input  />
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
});

var CartNode = React.createClass({
    deleteSpice: function(){
        this.props.onHandleDelete(this.props.data.id)
        console.log(this.state);
    },
    render: function(){
        return (
            <ul>
                <li>{this.props.data.id}</li>
                <li>{this.props.data.name}</li>
                <li>{this.props.data.price}</li>
                <li>Quantity: {this.props.data.quantity}</li>
                <li><button onClick={this.deleteSpice}>delete</button></li>
            </ul>
        );
    }
});
var SpeciesList = React.createClass({
    render: function(){
        var handleAddToCart = this.props.onHandleAddToCart;
        var spiceNodes = this.props.data.map(function(spice){
            var onHandleAddToCart = handleAddToCart;
            return (
                <Spice
                    Id = {spice.Id}
                    Img = {spice.Img}
                    Name = {spice.Name}
                    Price = {spice.Price}
                    onAddToCart={onHandleAddToCart} >
                </Spice>
                );
        });

        return (
            <div className="col-md-10">
                {spiceNodes}
            </div>
        );
    }
});

var Spice = React.createClass({
    AddToCart: function(){
        var name = this.props.Name;
        var img = this.props.Img;
        var price = this.props.Price;
        var id = this.props.Id;
        this.props.onAddToCart({id: id, 
            name: name, 
            img: img, 
            price:price});
    },
    render: function(){
        return (
            <div className="col-md-6">
                <img className="img-responsive" src={this.props.Img} />
                <h3>{this.props.Name}</h3>
                <p>{this.props.Price}</p>
                <button onClick={this.AddToCart}>Add</button>
            </div>
        );
    }
});

React.render(
    <SpeciesBox url="http://localhost:1234/species" />,
    document.getElementById('container')
);
