document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    // Toggle sidebar on click
    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.classList.remove('active');
        }
    });
});

// Mengambil elemen input box dan list container dari dokumen HTML berdasarkan ID-nya
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Fungsi untuk menambahkan task baru ke dalam daftar
function addtask() {
    // Mengecek apakah input box kosong, jika iya, munculkan alert
    if(inputBox.value === '') {
        alert("Anda harus menulis sesuatu!");
    } 
    // Jika ada input, buat task baru
    else {
        // Membuat elemen list item (li) baru untuk task
        let li = document.createElement("li");

        // Mengisi konten list item dengan nilai yang dimasukkan di input box
        li.innerHTML = inputBox.value;

        // Menambahkan task baru ke dalam container list task
        listContainer.appendChild(li);

        // Membuat elemen 'span' untuk tombol hapus (×)
        let span = document.createElement("span");

        // Mengisi konten dari span dengan simbol '×'
        span.innerHTML = "\u00d7";

        // Menambahkan tombol hapus (span) ke dalam task (li)
        li.appendChild(span);
    }
    
    // Mengosongkan input box setelah task ditambahkan
    inputBox.value = "";

    // Menyimpan daftar task yang telah diperbarui ke dalam localStorage
    saveData();
}

// Event listener untuk menangani aksi pada task (menandai sebagai selesai atau menghapus)
listContainer.addEventListener("click", function(e) {
    // Jika pengguna mengklik task (li), toggle kelas 'checked' untuk menandai sebagai selesai
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    // Jika pengguna mengklik tombol hapus (span), hapus task (li)
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);

// Fungsi untuk menyimpan keadaan daftar task saat ini ke dalam localStorage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Fungsi untuk memuat dan menampilkan task yang telah disimpan dari localStorage saat halaman di-load
function showtask(){
    // Mengambil daftar task yang tersimpan dan menampilkannya sebagai konten di list container
    listContainer.innerHTML = localStorage.getItem("data");
}

// Memanggil fungsi showtask untuk menampilkan task saat halaman dimuat ulang
showtask();