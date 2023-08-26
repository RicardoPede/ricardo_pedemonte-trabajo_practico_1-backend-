const productsList = document.querySelector("#productsList");

const showProducts = (products) => {
    if (products.length === 0) {
        productsList.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">No hay productos cargados aún.</td>
        </tr>
    `;
        return;
    }

    products.forEach((product) => {
        const dateIn = product.comments[0]?.CategoryEmployee.datePromotion;
        let date;
        if (dateIn) {
            date = dateIn?.split('T')[0].split('-')[2] + '/' + dateIn?.split('T')[0].split('-')[1] + '/' + dateIn?.split('T')[0].split('-')[0];
        }
        productsList.innerHTML += `
                <tr>
                    <th scope="row">
                      ${employee.id}
                    </th>
                    <td>
                      ${employee.lastName}
                    </td>
                    <td>
                      ${employee.name}
                    </td>
                    <td>
                      ${employee.age}
                    </td>
                    <td>${employee.Categories[0]?.name ?? 'No asignado'}</td>
                    <td>${date ?? '-'}</td>
                    <td>
                      ${employee.promotion ? 'Habilitado' : ' Inhabilitado'}
                    </td>
                    <td>
                      <a href="/products/${employee.id}/edit" class="btn btn-outline-success">Editar</a>
                      <a href="/products/${employee.id}/show" class="btn btn-outline-primary">Ver</a>
                      <button onclick=deleteEmployee(event) class="btn btn-outline-danger" data-id="${employee.id}">Eliminar</button>
                    </td>
                 </tr>
            `;
    });
};

const deleteEmployee = async (event) => {
    const id = event.target.dataset.id;

    Swal.fire({
        title: "Estás seguro?",
        text: `Estás por eliminar a un empleado del sistema!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Estoy seguro!",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await fetch(
                    `http://localhost:8000/api/products/${id}/destroy`,
                    {
                        method: "DELETE",
                    }
                );

                const data = await res.json();

                Swal.fire({
                    icon: "success",
                    title: "Empleado eliminado",
                    text: data.message,
                });

                setTimeout(() => {
                    window.location.reload();
                }, 2200);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            }
        }
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM Cargado");

    try {
        const products = await showProducts(products);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
        });
    }
});