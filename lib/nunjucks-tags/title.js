var Page = require('../models/Page').model();

module.exports = new function() {
  this.tags = ['title'];

  this.parse = function(parser, nodes) {
    var tok = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    var body = parser.parseUntilBlocks('endtitle');
    parser.advanceAfterBlockEnd();

    return new nodes.CallExtensionAsync(this, 'run', args, [body]);
  };

  this.run = function(context, body, callback) {
    body(function(error, html) {
      if (error) throw error;

      Page.findOne({
        where: {
          uri: context.ctx.uri
        }
      }, function(error, page) {
        if (error) throw error;

        if (page) {
          html = page.title;
        }

        callback(null, '<title>' + html + '</title>');
      });
    });
  };
}

