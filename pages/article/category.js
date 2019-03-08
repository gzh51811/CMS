//获取行id进行删除操作
function del(id) {
	console.log(id)
	layer.confirm('确认要删除吗？', function(id) {
		layer.msg('已删除!', {
			icon: 1,
			time: 1000
		});
	})

}

//自定义的render渲染输出多列表格
var layout = [{
		name: '菜单名称',
		treeNodes: true,
		headerClass: 'value_col',
		colClass: 'value_col',
		style: 'width: 60%'
	},
	{
		name: '操作',
		headerClass: 'td-manage',
		colClass: 'td-manage',
		style: 'width: 20%',
		render: function(row) {
			return	`<a title="删除" class='delBtn' onclick="del(${row.id})" href="javascript:;">\<i class="layui-icon">&#xe640;</i></a>`;
		}
	},
];
//加载扩展模块 treeGird
//		layui.config({
//			  base: './static/js/'
//			  ,version: '101100'
//			}).use('admin');



layui.extend({
	admin: '{/}../../static/js/admin',
	treeGird: '{/}../../lib/layui/lay/treeGird' // {/}的意思即代表采用自有路径，即不跟随 base 路径
});
layui.use(['treeGird', 'jquery', 'admin', 'layer'], function() {
	var layer = layui.layer,
		$ = layui.jquery,
		admin = layui.admin,
		treeGird = layui.treeGird;

	var tree1 = layui.treeGird({
		elem: '#demo', //传入元素选择器
		spreadable: true, //设置是否全展开，默认不展开
		nodes: [{
				"id": "1",
				"name": "电脑"
			},
			{
				"id": "2",
				"name": "手机"
			},
			{
				"id": "3",
				"name": "数码"
			}
		],
		layout: layout
	});
});