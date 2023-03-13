<script>
    export let product;

</script>

<article>

    <div class="product">

        <h2>{product.name}</h2>

        <p>{product.desc}</p>

        <p>Price: {product.price} credits</p>

        <button>Add to cart</button>

    </div>

</article>

<style>

    .product {

        border: 2px solid black;

        border-radius: 2em;

        padding: 1rem;

        margin: 1rem;

    }
</style>