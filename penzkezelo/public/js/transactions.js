function ajaxDeleteTransaction(id) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }

  return Promise.resolve(
    $.ajax({
      url: `/ajax/transactions/${id}/delete`,
      method: 'DELETE',
      dataType: 'json',
      headers
    })
  )
}

$(() => {

  $('.delete-transaction-form').submit((e) => {
    e.preventDefault();

    let $target = $(e.target);
    let $confirmModal = $('#confirm-delete-modal');
    let $confirmModalOk = $confirmModal.find('.modal-ok');

    $confirmModalOk.click((e) => {
      const id = $target.data('id');
      $target.closest('tr').remove();
      ajaxDeleteTransaction(id);
    });
    $confirmModal.modal('show');
  });

});
