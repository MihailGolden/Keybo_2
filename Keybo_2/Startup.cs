using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Keybo_2.Startup))]
namespace Keybo_2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
