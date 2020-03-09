# Embedding Flex in third-party CRM using Iframe and PostMessage

This application will communicate with Flex in order to show in the third-party CRM when a call is coming to the current agent. Moreover, with the CRM ballon that appears, the agent is able to accept or reject the call. The goal of this demo is to show how Flex inside an iframe and a proprietary CRM can communicate with each other and how Flex Actions can be triggered by the CRM.

## Install
```yarn install```

## Run

```yarn start```

## Flex Plugin

Go to plugin-crm directory and build the custom plugin as usual. This plugin identify if Flex is inside an iframe and if so, some layout features are modified and the postMessage communication is established.
