# BlazorWASM_Tailwind
Template and instruction to setup Tailwind to be use in Blazor WASM with ASP.Net hosted (dotnet 7).

Alternatively, you can use CDN...[Here](https://www.bloomberg.com/news/articles/2021-06-08/explaining-cdns-and-why-big-websites-crash-together-quicktake#xj4y7vzkg). It might be the better way for Blazor WASM.
## :white_check_mark: Requirements
We are using MySQL in this journey
```bash
$ node --version
v18.17.0
$ dotnet --version
7.0.401
$ dotnet tool install --global dotnet-ef # This install entity framework globally
```
## :checkered_flag: How to run ##
Go to appsetting.json edit connection to your MySQL DB
```json
{  
    "Logging": {    
        "LogLevel": {      
            "Default": "Information",      
            "Microsoft.AspNetCore": "Warning"    
        }  
    },
    "AllowedHosts": "*",    
    "ConnectionStrings":    
    {        
        "DefaultConnection": "Server=localhost;port=3306;userid={yourID};password={yourPass};database={DBName};"    
    }
}
```
Now use these commands in terminal
```bash
$ cd folder_name # cd into folder directory where .cs files are
$ dotnet restore # Restore the dependencies and tools of a project
$ dotnet run
```
## :white_check_mark: Instruction
Use either yarn or npm to installs these packages
```bash
$ cd ./{Blazor WASM folder}/Client
$ yarn init
$ yarn install -D tailwindcss postcss postcss-cli autoprefixer
$ yarn tailwindcss init -p # Generate both Tailwindcss and Postcss config files
```
Modified tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../**/*.{razor,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Create a Styles folder (inside Client folder) with a css file and put 3 Tailwindcss directive in there:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
There is a wwwroot folder within Client folder, add a blank css file in there:
```bash
$ touch ./{Blazor WASM folder}/Client/wwwroot/css/{you name it}.css
```
Now we add 2 scripts to package.json:
```javascript
"scripts": {
    "buildcss": "postcss ./Styles/tailwind.css -o ./wwwroot/css/{you literally just named it}.css",
    "finalcss": "postcss ./Styles/tailwind.css -o ./wwwroot/css/{you literally just named it}.css --minify"
}
```
Finally, we add pre-compile instructions into {Blazor WASM project name}.Client.csproj
```csharp
<Target Name="CheckNPMIsInstalled" BeforeTargets="InstallYarn">
  <Exec Command="npm -v" ContinueOnError="true">
    <Output TaskParameter="ExitCode" PropertyName="ErrorCode" />
  </Exec>

  <Error Condition="'$(ErrorCode)' != '0'" Text="You must install npm" />
</Target>

<Target Name="InstallYarn" BeforeTargets="InstallDependencies">
  <Exec Command="npm install -g yarn" />
  <Touch Files="$(NpmLastInstall)" AlwaysCreate="true" />
</Target>

<Target Name="InstallDependencies" BeforeTargets="BuildTailwindCSS">
  <Exec Command="yarn" />
</Target>

<Target Name="BuildTailwindCSS" BeforeTargets="Compile">
  <Exec Command="yarn run buildcss" Condition="'$(Configuration)' == 'Debug'" />
  <Exec Command="yarn run finalcss" Condition="'$(Configuration)' == 'Release'" />
</Target>
```
