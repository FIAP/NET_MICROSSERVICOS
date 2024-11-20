using System.Web;
using System.Web.Optimization;

namespace WEB
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Public/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/primeiraDobra").Include(
                      "~/Public/Scripts/plugins/3d-bold-navigation/js/modernizr.js",
                      "~/Public/Scripts/plugins/offcanvasmenueffects/js/snap.svg-min.js"));

            bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                     "~/Public/Scripts/plugins/jquery/jquery-2.1.3.min.js",
                     "~/Public/Scripts/plugins/jquery-ui/jquery-ui.min.js",
                     //"~/Public/Scripts/semantic.min.js",
                     //"~/Public/Scripts/plugins/pace-master/pace.min.js",
                     "~/Public/Scripts/plugins/jquery-blockui/jquery.blockui.js",
                     "~/Public/Scripts/plugins/bootstrap/js/bootstrap.min.js",
                     "~/Public/Scripts/plugins/jquery-slimscroll/jquery.slimscroll.min.js",
                     "~/Public/Scripts/plugins/switchery/switchery.min.js",
                     "~/Public/Scripts/plugins/uniform/jquery.uniform.min.js",
                     "~/Public/Scripts/plugins/offcanvasmenueffects/js/classie.js",
                     "~/Public/Scripts/plugins/offcanvasmenueffects/js/main.js",
                     "~/Public/Scripts/plugins/waves/waves.min.js",
                     "~/Public/Scripts/plugins/3d-bold-navigation/js/main.js",
                     "~/Public/Scripts/modern.min.js",
                     "~/Public/Scripts/plugins/datatables/js/jquery.datatables.js",
                     "~/Public/Scripts/plugins/datatables/js/jquery.datatables.sortingdates.js",
                     "~/Public/Scripts/plugins/x-editable/bootstrap3-editable/js/bootstrap-editable.js",
                     "~/Public/Scripts/plugins/jquery-mockjax-master/jquery.mockjax.js",
                     "~/Public/Scripts/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js",
                     "~/Public/Scripts/plugins/bootbox/js/bootbox.js",
                     "~/Public/Scripts/plugins/jasny/jasny-bootstrap.js",
                     "~/Public/Scripts/bootstrap-editable.min.js",
                     "~/Public/Scripts/main_system.js"

             ));

            bundles.Add(new StyleBundle("~/Content/pluginsCss").Include(
                    "~/Public/Scripts/plugins/bootstrap/css/bootstrap.min.css",
                    "~/Public/Scripts/plugins/jquery-datetimepicker/jquery.datetimepicker.css",
                    "~/Public/Scripts/plugins/datatables/css/jquery.datatables.css",
                    "~/Public/Scripts/plugins/datatables/css/jquery.datatables_themeroller.css",
                    "~/Public/Scripts/plugins/x-editable/bootstrap3-editable/css/bootstrap-editable.css",
                    "~/Public/Scripts/plugins/bootstrap/css/bootstrap.min.css",
                    "~/Public/Scripts/plugins/fontawesome/css/font-awesome.css",
                    "~/Public/Scripts/plugins/line-icons/simple-line-icons.css",
                    "~/Public/Scripts/plugins/offcanvasmenueffects/css/menu_cornerbox.css",
                    "~/Public/Scripts/plugins/waves/waves.min.css",
                    "~/Public/Scripts/plugins/switchery/switchery.min.css",
                    "~/Public/Scripts/plugins/3d-bold-navigation/css/style.css",
                    "~/Public/Scripts/plugins/slidepushmenus/css/component.css",
                    "~/Public/Css/bootstrap-editable.css",
                    "~/Public/Css/jasny/jasny-bootstrap.css"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Public/Css/modern.min.css",
                "~/Public/css/themes/white.css",
                "~/Public/css/animate.min.css",
                "~/Public/Css/Site.css",
                "~/Public/Css/custom.css"
           ));

            bundles.Add(new StyleBundle("~/Content/sistema").Include(
               "~/Public/Scripts/plugins/fontawesome/css/font-awesome.css",
               "~/Public/Scripts/plugins/bootstrap/css/bootstrap.min.css",
               "~/Public/Scripts/plugins/jquery-slimscroll/examples/libs/prettify/prettify.css",
               "~/Public/Scripts/plugins/jquery-datetimepicker/jquery.datetimepicker.css",
               "~/Public/Scripts/plugins/flipclock/flipclock.css",
               "~/Public/Css/main.css"
          ));

            bundles.Add(new ScriptBundle("~/bundles/sistema").Include(
              "~/Public/Scripts/plugins/jquery/jquery-2.1.3.min.js",
              "~/Public/Scripts/plugins/bootstrap/js/bootstrap.min.js",
              "~/Public/Scripts/material.min.js",
              "~/Public/Scripts/plugins/moment/moment.js",
              "~/Public/Scripts/main.js",
              "~/Public/Scripts/form-wizard.js",
              "~/Public/Scripts/jquery.validate.js",
              "~/Public/Scripts/jquery.bootstrap.wizard.js",
              "~/Public/Scripts/plugins/jasny/jasny-bootstrap.js",
              "~/Public/Scripts/plugins/flipclock/flipclock.js",
              "~/Public/Scripts/plugins/bootbox/js/bootbox.js",
              "~/Public/Scripts/plugins/jquery-datetimepicker/jquery.datetimepicker.full.min.js"
          ));

            bundles.Add(new ScriptBundle("~/bundles/admin").Include(
             "~/Public/Scripts/main-admin.js"));

            bundles.Add(new ScriptBundle("~/bundles/test").Include(
                "~/Public/Scripts/test/main.js",
                "~/Public/Scripts/test/noback.js"));


            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                "~/Public/Scripts/login/main.js"));

            bundles.Add(new ScriptBundle("~/bundles/schedulingTool").Include(
                    "~/Public/Scripts/plugins/jquery-datetimepicker/jquery.datetimepicker.full.min.js",
                    "~/Public/Scripts/admin-schedule/tool.js"));

            bundles.Add(new ScriptBundle("~/bundles/tinymce").Include(
                "~/Public/Scripts/plugins/tinymce/jquery.tinymce.min.js",
                "~/Public/Scripts/plugins/tinymce/tinymce.min.js"));

        }
    }
}
