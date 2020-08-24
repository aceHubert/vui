# Actionsheet

## Props

| name             | type         | default | description                                                                                                                                                                                                                        | version |
| ---------------- | ------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: |
| value/v-model    | boolean      | false   | show or not                                                                                                                                                                                                                        |    -    |
| header           | string       | -       | only works it in the ios theme                                                                                                                                                                                                     |    -    |
| showCancel       | boolean      | false   | show cancel button, only works in the ios theme                                                                                                                                                                                    |    -    |
| cancelText       | string       | -       | cancel button text, only works in the ios theme                                                                                                                                                                                    |    -    |
| theme            | string       | '_ios_' | the menu style, options: '_android_' \| '_ios_'                                                                                                                                                                                    |    -    |
| menus            | Object/Array | []      | support format: <br> **Object**: { [key: string]: string \| { label: string, type: string } } <br> **Array**: [{ key: string, label: string, type: string }] <br> _type_: 'default' \| 'primary' \| 'warn' \| 'info' \| 'disabled' |    -    |
| closeOnClickMenu | boolean      | true    | hide when click the menu item                                                                                                                                                                                                      |    -    |
| closeOnClickMask | boolean      | true    | hide when click the mask                                                                                                                                                                                                           |    -    |

## Events

| name              | args        | description                                                                  | version |
| ----------------- | ----------- | ---------------------------------------------------------------------------- | :-----: |
| menu-click        | (key, item) | when click the menu item <br> the key is 'cancel' when cancel button clicked |    -    |
| menu-click-{key}  | -           | when click the menu item                                                     |    -    |
| menu-click-cancel | -           | when click the cancel button                                                 |    -    |
| mask-click        | -           | when click the mask                                                          |    -    |
| after-show        | -           | when the end of the show animation                                           |    -    |
| after-hide        | -           | when the end of the hide animation                                           |    -    |

## Slots

| name   | description                  | version |
| ------ | ---------------------------- | :-----: |
| header | header slot in theme '_ios_' |    -    |

## Style Variables

| name                              | description                                 | version |
| --------------------------------- | ------------------------------------------- | :-----: |
| @actionsheet-label-primary-color  | lable color when menu item type is primary  |    -    |
| @actionsheet-label-warn-color     | lable color when menu item type is warn     |    -    |
| @actionsheet-label-info-color     | lable color when menu item type is info     |    -    |
| @actionsheet-label-default-color  | default lable color                         |    -    |
| @actionsheet-label-disabled-color | lable color when menu item type is disabled |    -    |
