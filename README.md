#chat-space database設計
-------------------------
##必要なテーブルとカラム
*users*
-id
-name(string)
-group_id(integer)

*groups*
-id
-name (string)

*messages*
-id
-body(text)
-image(string)
-user_id(integer)
-group_id(integer)
