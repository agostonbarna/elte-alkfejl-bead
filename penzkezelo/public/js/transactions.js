function ajaxDeleteTransaction(id) {
  return Promise.resolve(
    $.ajax({
      url: `/ajax/transactions/${id}/delete`,
      method: 'DELETE',
      dataType: 'json'
    })
  )
}

$(() => {

  $.ajaxSetup({
    headers: {
      'csrf-token': $('[name="_csrf"]').val()
    }
  });

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

  let $searchForm = $('#searchForm')
  $searchForm.submit((e) => {
    e.preventDefault();

    let $target = $(e.target);
    $('#transactionTableBody').load('/ajax/getTransactionRows', $target.serializeArray());
  });
  $searchForm.removeClass('hide');

});
