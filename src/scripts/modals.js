import Swal from "sweetalert2";
import "animate.css";

class Modals {
  static showSuccessModal(title, message) {
    Swal.fire({
      title: `${title}`,
      text: `${message}`,
      confirmButtonColor: "#3092e2;",
      icon: "success",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInRight
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutLeft
          animate__faster
        `,
      },
    });
  }

  static showErrorModal(message) {
    Swal.fire({
      title: `ERROR`,
      text: `${message}`,
      icon: "error",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  }

  static showLoadingModal() {
    Swal.fire({
      title: "Loading...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
}

export default Modals;
