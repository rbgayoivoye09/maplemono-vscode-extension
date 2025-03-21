// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	deactivateMapleMono,
	mapleMonoActivation,
	firstTimeActivation
} from "./util";

export async function activate(context: vscode.ExtensionContext) {
	firstTimeActivation(context);
  
	let activateCommand = vscode.commands.registerCommand(
	  "maplemono.activate",
	  () => mapleMonoActivation(context)
	);
	let deactivateCommand = vscode.commands.registerCommand(
	  "maplemono.deactivate",
	  () => deactivateMapleMono(context)
	);
	context.subscriptions.push(activateCommand, deactivateCommand);
  }
  
  export function deactivate(context: vscode.ExtensionContext) {
	deactivateMapleMono(context);
  }
  