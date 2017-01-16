function ajaxDeleteTag(id) {
  return Promise.resolve(
    $.ajax({
      url: `/ajax/tags/${id}/delete`,
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
      ajaxDeleteTag(id);
    });
  });

  $confirmDeleteModal.on('hide.bs.modal', function(e) {
    $confirmDeleteModalOk.off();
  });

  $('.delete-tag-form').submit(function(e) {
    e.preventDefault();
  });

});
