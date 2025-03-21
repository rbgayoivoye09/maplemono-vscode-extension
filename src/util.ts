import * as vscode from "vscode";
import path = require("path");
import { defaultSettings, GeneralObject } from "./defaultSettings";

const showDialog = vscode.window.showInformationMessage;
  
const maplemonoPath = (context: vscode.ExtensionContext) =>
    path.resolve(context.extensionPath, "mapleMonoFont");

// 定义 updateUserSettings 函数，接收两个参数：settings 和 remove
// settings 是一个 GeneralObject 类型的对象，包含要更新的设置
// remove 是一个布尔值，默认为 false，表示是否移除设置
const updateUserSettings = (settings: GeneralObject, remove = false) =>
    // 使用 Object.entries 方法将 settings 对象转换为键值对数组
    // 并对每个键值对执行 forEach 循环
    Object.entries(settings).forEach(([key, value]) =>
        // 获取 vscode 工作区的配置对象
        vscode.workspace
            .getConfiguration()
            // 调用 update 方法更新配置
            .update(
                // 第一个参数是要更新的配置项的键
                key,
                // 第二个参数是要更新的值
                // 如果 remove 为 true，则将值设为 undefined，表示移除该配置项
                // 否则使用传入的 value
                remove ? undefined : value,
                // 第三个参数指定配置的作用范围为全局
                vscode.ConfigurationTarget.Global
            )
    );

    export function dirOpen(dirPath: string) {
        let command = "";
        switch (process.platform) {
          case "darwin":
            command = "open";
            break;
          case "win32":
            command = "explorer";
            break;
          default:
            command = "xdg-open";
            break;
        }
        return require("child_process").exec(`${command} ${dirPath}`);
      }
      
      export function mapleMonoActivation(context: vscode.ExtensionContext) {
        const maplemonoAddress = maplemonoPath(context);
        updateUserSettings(defaultSettings);
        dirOpen(maplemonoAddress);
        showDialog(`${context.extension.packageJSON.displayName} is activated!`);
        showDialog(
          `Important Note - Don't forget to install fonts! Font Directory will open, once you have manually installed fonts, restart VSCODE - ${maplemonoAddress}`
        );
      }
      
      export const mapleMonoActivationPrompt = (context: vscode.ExtensionContext) =>
        showDialog("Activate MapleMono?", "Yes", "No").then((value) =>
          value === "Yes"
            ? mapleMonoActivation(context)
            : (showDialog(
                "You can activate MapleMono later by running 'maplemono' in command palette."
              ) as any)
        );
      
      export function firstTimeActivation(context: vscode.ExtensionContext) {
        const version = context.extension.packageJSON.version ?? "1.0.0";
        const previousVersion = context.globalState.get(context.extension.id);
        if (previousVersion === version) return;
      
        mapleMonoActivation(context);
        context.globalState.update(context.extension.id, version);
      }
      
      export function deactivateMapleMono(context: vscode.ExtensionContext) {
        // context.globalState.update(context.extension.id, undefined);
        updateUserSettings(defaultSettings, true);
        showDialog(`${context.extension.packageJSON.displayName} is deactivated!`);
      }
      