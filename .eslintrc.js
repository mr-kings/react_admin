module.exports = {
	"extends": ["react-app", "prettier", "prettier/react"],
	"plugins": ["prettier"],
	"rules": {
		"import/no-extraneous-dependencies": ["error", {
			"packageDir": "."
		}],
		"no-console": ["error", {
			"allow": ["warn", "error", "info"]
		}],
		"prefer-destructuring": ["error", {
			"VariableDeclarator": {
				"array": false,
				"object": true
			},
			"AssignmentExpression": {
				"array": false,
				"object": false
			}
		}, {
			"enforceForRenamedProperties": false
		}],
		"react/jsx-filename-extension": ["error", {
			"extensions": [".js", ".jsx"]
		}],
		"no-unused-vars": [2, {
			// 允许声明未使用变量
			"vars": "local",
			// 参数不检查
			"args": "none"
		}],
		"no-multi-spaces": 1, //不能用多余的空格
		"react/prefer-stateless-function": "off",
		"prettier/prettier": "error"
	}
}
