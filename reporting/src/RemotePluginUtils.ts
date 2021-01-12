import {RemoteContainerUtils} from "./RemoteContainerUtils";

export class RemotePluginUtils {

    static setupRemotePlugin(plugin: any, done: (widgets: any[]) => void): void {

        console.log("[reporting] Setup Remote Plugin [" + plugin.url + "]");

        RemoteContainerUtils.loadScript(plugin.url, {

            onError: (): void => {

                console.log("[reporting] Remote Plugin Script [" + plugin.url + "] ERROR");
                done([]);

            },

            onSuccess: (): void => {

                console.log("[reporting] Remote Plugin Script [" + plugin.url + "] OK");

                RemoteContainerUtils.loadModule(plugin.scope, plugin.module)()

                    .then((module: any) => {

                        const widgets: any[] = [];

                        console.log("[reporting] Remote Plugin [" + plugin.url + "] definition OK");

                        try {
                            const pluginDefinition: any = module.default;

                            console.log("[reporting] Remote Plugin [" + plugin.url + "] definition [id:" + pluginDefinition.id + "]");

                            pluginDefinition.registerWidgets && pluginDefinition.registerWidgets({
                                registerWidget(widget: any) {
                                    widgets.push(widget);
                                }
                            });

                        } catch (error) {
                            console.log("[reporting] Remote Plugin [" + plugin.url + "]: function definition error");
                        }

                        done(widgets);


                    })
                    .catch((error) => {

                        console.log("[reporting] Remote Plugin [" + plugin.url + "] definition error", error);
                        done([]);

                    });

            }

        });
    }

}