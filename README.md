#chat-space database設計
-------------------------
##必要なテーブルとカラム
*users*
- id
- name(string)

*groups*
- id
- name (string)

*users_groups*
- id
- user_id(integer)
- group_id(integer)

*messages*
- id
- body(text)
- image(string)
- user_id(integer)
- group_id(integer)

##アソシエーション
- user has many groups, through users_groups
- group has many users, through users_groups
