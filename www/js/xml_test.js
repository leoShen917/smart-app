
//测试demo

$(function(){

	var xmlDom=$($.parseXml("<?xml version=\"1.0\" encoding=\"utf-8\" ?><root><person></person></root>"));

	xmlDom.find("root").appendXml("<content/>").text("测试");

	xmlDom.find("content").beforeXml("<test/>");

	alert(xmlDom.xml());

});

(function($) {

    function mnpXml(opCode, xmlStr) {

        return this.each(function() {

            if (typeof xmlStr != "string") return;

            if (!jQuery.isXMLDoc(this)) return;

            var node = $.parseXml(xmlStr).firstChild.cloneNode(true);

            switch (opCode) {

                case "append":

                    this.appendChild(node);

                    break;

                case "prepend":

                    if (this.childNodes.length > 0)

                        this.insertBefore(node, this.firstChild);

                    else

                        this.appendChild(node);

                    break;

                case "after":

                    if (this.nextSibling)

                        this.parentNode.insertBefore(node, this.nextSibling);

                    else

                        this.parentNode.appendChild(node);

                    break;

                case "before":

                    this.parentNode.insertBefore(node, this);

                    break;

            }

        });

    }

    $.fn.extend({

        appendXml: function(s) {

            return mnpXml.call(this, "append", s);

        },

        prependXml: function(s) {

            return mnpXml.call(this, "prepend", s);

        },

        afterXml: function(s) {

            return mnpXml.call(this, "after", s);

        },

        beforeXml: function(s) {

            return mnpXml.call(this, "before", s);

        },

        xml: function() {

            var elem = this[0];

            return  elem.xml || (new XMLSerializer()).serializeToString(elem) ;

        },

        innerXml: function() {

            var s = this.xml();

            var i = s.indexOf(">"), j = s.lastIndexOf("<");

            if (j > i)

                return s.substring(i + 1, j);

            else

                return "";

        }

    });

    $.extend(jQuery, {

        parseXml: function(xmlStr) {

            if (window.ActiveXObject) {

                var xd = new ActiveXObject("Microsoft.XMLDOM");

                xd.async = false;

                xd.loadXML(xmlStr);

                return xd;

            }

            else if (typeof DOMParser != "undefined") {

                var xd = new DOMParser().parseFromString(xmlStr, "text/xml");

                return xd;

            }

            else return null;

        },

        toXml: function(obj, nodeName, useAttr) {

            var x = $($.parseXml("<" + nodeName + " />"));

            var n = x.find(":first");

            for (var p in obj) {

                if (useAttr)

                    n.attr(p, obj[p]);

                else

                    n.appendXml("<" + p + " />").find(p).text(obj[p]);

            }

            return x[0];

        }

    });

})(jQuery);
