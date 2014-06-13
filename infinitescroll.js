(function($){
  $.fn.infinitescroll = function(options) {
    var states = {
      curPage: 1,
      processing: false
    }

    var options = $.extend({
      thresholdPx: 100,
      ajaxType: "POST",
      url: "",
      dataType: "html",
      data: {},
      callback: function(data, textStatus, jqXHR) {
        this.append(data)
      }
    }, options)

    this.scroll(function(e){
      var scrollHeight = $(e.target).scrollTop()
      var height = $(e.target).height()

      if (height - scrollHeight < options.thresholdPx && !states.processing ) {
        states.curPage = states.curPage + 1
        $.ajax({
          url: options.url,
          type: options.ajaxType,
          dataType: options.dataType,
          data: $.extend({page: states.curPage}, options.data),
          beforeSend: function() {
            states.processing = true
          },
          complete: function() {
            states.processing = false
          },
          success: options.callback
        })
      }
    })
  }
}(jQuery))
