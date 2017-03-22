# chat-space database設計
## 必要なテーブルとカラム
*users*
- id
- name(string)

*groups*
- id
- name (string)

*group_users*
- id
- user_id(integer)
- group_id(integer)

*messages*
- id
- body(text)
- image(string)
- user_id(integer)
- group_id(integer)

## アソシエーション
*user*
- user has many group_users
- user has many groups, through group_users
- user has many messages
*group*
- group has many group_users
- group has many users, through group_users
- group has many messages
*messages*
- message belongs_to user
- message belongs_to group
