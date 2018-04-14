using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Oracle.Net.Startup))]
namespace Oracle.Net
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
