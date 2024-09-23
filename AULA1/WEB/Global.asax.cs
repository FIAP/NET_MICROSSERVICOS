using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using WEB.Mappers;
using Autofac.Integration.Mvc;
using Autofac;
using MVC.App_Start.AutoFacModules;
using Service.Config;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System;

namespace WEB
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_AuthenticateRequest(Object sender, EventArgs e)
        {
            HttpCookie authCookie = Context.Request.Cookies[FormsAuthentication.FormsCookieName];

            if (authCookie != null) {
                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                if (authTicket != null && !authTicket.Expired) {
                    string[] userData = authTicket.Name.Split('|');
                    string username = userData[0];
                    string email = userData[1];
                    string role = userData[2]; 

                    var identity = new System.Security.Principal.GenericIdentity(username);
                    var principal = new System.Security.Principal.GenericPrincipal(identity, new[] { role });

                    Context.User = principal;
                }
            }
        }


        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            #region DI
            var builder = new Autofac.ContainerBuilder();
            builder.RegisterControllers(typeof(MvcApplication).Assembly).PropertiesAutowired();
            builder.RegisterModule(new RepositoryModule());
            builder.RegisterModule(new ServiceModule());
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            ConfigDB.Registry(ConfigurationManager.ConnectionStrings["PostgreSqlConnection"].ConnectionString);
            #endregion

            AutoMapperConfig.RegisterMappings();
        }
    }
}
