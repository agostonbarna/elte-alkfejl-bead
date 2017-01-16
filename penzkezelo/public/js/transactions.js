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

  let $confirmDeleteModal = $('#confirm-delete-modal');
  let $confirmDeleteModalOk = $confirmDeleteModal.find('.modal-ok');

  $confirmDeleteModal.on('show.bs.modal', function(e) {
    let $relatedTarget = $(e.relatedTarget);
    let id = $relatedTarget.data('id');
    $confirmDeleteModalOk.click(function(e) {
      $relatedTarget.closest('tr').remove();
      ajaxDeleteTransaction(id);
    });
  });

  $confirmDeleteModal.on('hide.bs.modal', function(e) {
    $confirmDeleteModalOk.off();
  });

  $('.delete-transaction-form').submit(function(e) {
    e.preventDefault();
  });

  let $searchForm = $('#search-form');
  let $transactionTableBody = $('#transaction-table-body');
  $searchForm.submit(function(e) {
    e.preventDefault();

    let $target = $(this);
    $transactionTableBody.load('/ajax/getTransactionRows', $target.serializeArray());
  });
  $searchForm.removeClass('hide');

});
