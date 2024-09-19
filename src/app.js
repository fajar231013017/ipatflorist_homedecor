document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Bucket Mawar Unggu', img: '1.PNG', price: 250000 },
            { id: 2, name: 'Bucket Sedang', img: '2.PNG', price: 80000 },
            { id: 3, name: 'Bucket Mawar Merah', img: '3.PNG', price: 250000 },
            { id: 4, name: 'Bucket Wisuda', img: '4.PNG', price: 50000 },
            { id: 5, name: 'Bucket Snack ', img: '5.PNG', price: 100000 },
            { id: 6, name: 'Plakat ', img: '6.PNG', price: 40000 },
            { id: 7, name: 'Medali ', img: '7.PNG', price: 100000 },
            { id: 8, name: 'Anggrek Meja ', img: '8.PNG', price: 200000 },
            { id: 9, name: 'Bunga meja campur ', img: '9.PNG', price: 100000 },
            { id: 10, name: 'kupu-kupu ', img: '10.PNG', price: 6000 },
            { id: 11, name: 'meja belajar ', img: '11.PNG', price: 500000 },
            { id: 12, name: 'stool 1 paket ', img: '12.PNG', price: 500000 },
            { id: 13, name: 'Bucket pertangkai ', img: '13.PNG', price: 50000 },
            { id: 14, name: 'kaca hias ', img: '14.PNG', price: 60000 },
            { id: 15, name: 'pajangan dinding ', img: '15.PNG', price: 50000 },
            { id: 16, name: 'rak sepatu + tempat duduk ', img: '16.PNG', price: 1000000 },
            { id: 17, name: 'alas Meja ', img: '17.PNG', price: 20000 },
            { id: 18, name: 'hias mobil pengantin ', img: '18.PNG', price: 500000 },
            { id: 19, name: 'stool /pcs ', img: '19.PNG', price: 200000 },
            { id: 20, name: 'meja ousin ', img: '20.PNG', price: 200000 },
        ],
    }));
    
    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            //cek apakah ada barang di card
            const cartItem = this.items.find((item) => item.id === newItem.id);

            //jika belum ada
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada apakah barangnya sama atau beda di cart
                this.items = this.items.map((item) => {
                    //jika barangnya beda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        //jika barang sudah ada, tabah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }

                })
            }
        },
        remove(id) {
            //ambil item yang akan di remove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);
            //jika item lebih dari 1
            if(cartItem.quantity > 1) {
                //telusuri 1 1
                this.items = this.items.map((item) => {
                    //jika bukan barang yang diklik
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.taotal -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                //jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    })
});

//konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID',{
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};