$(() => {

  $('#delete-user-form').submit((e) => {
    e.preventDefault();

    let $target = $(e.target);
    let $confirmModal = $('#confirm-delete-modal');
    let $confirmModalOk = $confirmModal.find('.modal-ok');

    $confirmModalOk.click((e) => {
      $target.unbind('submit').submit();
    });
    $confirmModal.modal('show');
  });

});
