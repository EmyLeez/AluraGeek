export async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function addProduct(product) {
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!response.ok) throw new Error('Erro ao adicionar produto');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar produto');
    } catch (error) {
        console.error(error);
    }
}
