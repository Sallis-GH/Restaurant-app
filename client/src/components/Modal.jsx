import Loading from "./loading";

const Modal = () => {
    return (
     <>
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog">
                <Loading />
            </div>
        </div>
        <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Checkout</a>
    </>
);
}

export default Modal;