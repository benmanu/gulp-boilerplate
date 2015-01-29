<!doctype html>
<!--[if lt IE 7 ]><html lang="en" class="no-js lte6 lte7 lte8 lte9 all"><![endif]-->
<!--[if IE 7 ]><html lang="en" class="no-js lte7 lte8 lte9 all"><![endif]-->
<!--[if IE 8 ]><html lang="en" class="no-js lte8 lte9 all"><![endif]-->
<!--[if IE 9 ]><html lang="en" class="no-js lte9 all"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="en" class="no-js all"><!--<![endif]-->
<head>
	<% base_tag %>
	<title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no">

	<%-- <link rel="icon" type="image/png" href="$ThemeDir/dist/images/favicon-196x196.png" /> --%>
	
	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<link rel="stylesheet" href="$ThemeDir/dist/css/screen.css" />
    <link rel="stylesheet" href="$ThemeDir/dist/css/print.css" />
</head>
<body class="t_{$ClassName}">
	$Layout

    <script src="$ThemeDir/dist/js/core.js"></script>
    
</body>
</html>