function ajaxDeleteTag(id) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }

  return Promise.resolve(
    $.ajax({
      url: `/ajax/tags/${id}/delete`,
      method: 'DELETE',
      dataType: 'json',
      headers
    })
  )
}

$(() => {

  $('.delete-tag-form').submit((e) => {
    e.preventDefault();

    let $target = $(e.target);
    let $confirmModal = $('#confirm-delete-modal');
    let $confirmModalOk = $confirmModal.find('.modal-ok');

    $confirmModalOk.click((e) => {
      const id = $target.data('id');
      $target.closest('tr').remove();
      ajaxDeleteTag(id);
    });
    $confirmModal.modal('show');
  });

});