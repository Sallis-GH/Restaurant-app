import Loading from "./loading";
import '../__style__/loading.css';

const Modal = () => {
    return (
        <>
            <div class="modal fade loading-modal " id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog">
                    <Loading />
                </div>
            </div>
            <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Checkout</a>
        </>
    );
}

export default Modal;