import 'package:flutter/material.dart';
import 'package:flutter_deer/goods/provider/goods_sort_provider.dart';
import 'package:flutter_deer/goods/widgets/goods_sort_bottom_sheet.dart';
import 'package:flutter_deer/res/resources.dart';
import 'package:flutter_deer/routers/fluro_navigator.dart';
import 'package:flutter_deer/util/device_utils.dart';
import 'package:flutter_deer/util/theme_utils.dart';
import 'package:flutter_deer/util/toast_utils.dart';
import 'package:flutter_deer/widgets/click_item.dart';
import 'package:flutter_deer/widgets/load_image.dart';
import 'package:flutter_deer/widgets/my_app_bar.dart';
import 'package:flutter_deer/widgets/my_button.dart';
import 'package:flutter_deer/widgets/my_scroll_view.dart';
import 'package:flutter_deer/widgets/selected_image.dart';
import 'package:flutter_deer/widgets/text_field_item.dart';

import '../../statistics/statistics_router.dart';
import '../../widgets/my_card.dart';
import '../goods_router.dart';

/// design/4商品/index.html#artboard5
class GoodsEditPage extends StatefulWidget {
  
  const GoodsEditPage({
    Key? key,
    this.isAdd = true,
    this.isScan = false,
    this.heroTag,
    this.goodsImageUrl
  }) : super(key: key);
  
  final bool isAdd;
  final bool isScan;
  final String? heroTag;
  final String? goodsImageUrl;
  
  @override
  _GoodsEditPageState createState() => _GoodsEditPageState();
}

class _GoodsEditPageState extends State<GoodsEditPage> {

  String? _goodsSortName;
  final TextEditingController _codeController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance!.addPostFrameCallback((_) {
      if (widget.isScan) {
        _scan();
      }
    });
  }

  void _scan() async {
    if (Device.isMobile) {
      NavigatorUtils.unfocus();
      // 延时保证键盘收起，否则进入扫码页会黑屏
      Future<dynamic>.delayed(const Duration(milliseconds: 500), (){
        NavigatorUtils.pushResult(context, GoodsRouter.qrCodeScannerPage, (Object code) {
          _codeController.text = code.toString();
        });
      });
    } else {
      Toast.show('当前平台暂不支持');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        centerTitle: widget.isAdd ? '添加商品' : 'Inspection',
      ),
      body: MyScrollView(
        key: const Key('goods_edit_page'),
        padding: const EdgeInsets.symmetric(vertical: 16.0),
        bottomButton: Padding(
          padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 8.0),
          child: MyButton(
            onPressed: () => NavigatorUtils.goBack(context),
            text: 'Submit',
          ),

        ),
        children: <Widget>[
          Gaps.vGap5,
          const Padding(
            padding: EdgeInsets.only(left: 16.0),
            child: Text(
              '基本信息',
              style: TextStyles.textBold18,
            ),
          ),
          Gaps.vGap16,
          Center(
            child: SelectedImage(
              heroTag: widget.heroTag,
              url: widget.goodsImageUrl,
              size: 96.0,
            ),
          ),
          Gaps.vGap8,
          Center(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const <Widget>[
                Gaps.vGap32,
                Text('   Report Submission', style: TextStyles.textBold18),
                Gaps.vGap16,
                _StatisticsItem('Upload Photo', 'photo', 1),
                Gaps.vGap8,
                _StatisticsItem('Signature', 'sign', 2)

              ],
            ),
          ),
          Gaps.vGap32,
          const Padding(
            padding: EdgeInsets.only(left: 16.0),
            child: Text(
              'Details',
              style: TextStyles.textBold18,
            ),
          ),
          Gaps.vGap16,
          const TextFieldItem(
              title: 'Inspector hash: C5A8D95238CD3EE......69FA4F721B7F',
              keyboardType: TextInputType.numberWithOptions(decimal: true)
          ),
          Gaps.vGap16,
          const TextFieldItem(
            title: 'Timestamp: ',
            hintText: '  2022-02-28 15:40:45',
          ),
          const TextFieldItem(
            title: '商品简介',
            hintText: '填写简短描述',
          ),
          const TextFieldItem(
            title: '折后价格',
            keyboardType: TextInputType.numberWithOptions(decimal: true),
            hintText: '填写商品单品折后价格',
          ),
          Stack(
            alignment: Alignment.centerRight,
            children: <Widget>[
              TextFieldItem(
                controller: _codeController,
                title: '商品条码',
                hintText: '选填',
              ),
              Positioned(
                right: 0.0,
                child: Semantics(
                  label: '扫码',
                  child: GestureDetector(
                    onTap: _scan,
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: context.isDark ?
                        const LoadAssetImage('goods/icon_sm', width: 16.0, height: 16.0) :
                        const LoadAssetImage('goods/scanning', width: 16.0, height: 16.0),
                    ),
                  ),
                ),
              )
            ],
          ),
          const TextFieldItem(
            title: '商品说明',
            hintText: '选填',
          ),

          const TextFieldItem(
            title: '折扣金额',
            keyboardType: TextInputType.numberWithOptions(decimal: true)
          ),
          Gaps.vGap32,
          const Padding(
            padding: EdgeInsets.only(left: 16.0),
            child: Text(
              '类型规格',
              style: TextStyles.textBold18,
            ),
          ),
          Gaps.vGap16,
          ClickItem(
            title: '商品类型',
            content: _goodsSortName ?? '选择商品类型',
            onTap: () => _showBottomSheet(),
          ),
          ClickItem(
            title: '商品规格',
            content: '对规格进行编辑',
            onTap: () => NavigatorUtils.push(context, GoodsRouter.goodsSizePage),
          ),
          Gaps.vGap8,
        ],
      )
    );
  }

  final GoodsSortProvider _provider = GoodsSortProvider();

  @override
  void dispose() {
    _provider.dispose();
    _codeController.dispose();
    super.dispose();
  }

  void _showBottomSheet() {
    showModalBottomSheet<void>(
      context: context,
      /// 使用true则高度不受16分之9的最高限制
      isScrollControlled: true,
      builder: (BuildContext context) {
        return GoodsSortBottomSheet(
          provider: _provider,
          onSelected: (_, name) {
            setState(() {
              _goodsSortName = name;
            });
          },
        );
      },
    );
  }
}
class _StatisticsItem extends StatelessWidget {

  const _StatisticsItem(this.title, this.img, this.index, {Key? key}): super(key: key);

  final String title;
  final String img;
  final int index;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 2.14,
      child: GestureDetector(
        onTap: () {
          if (index == 1 || index == 2) {
            NavigatorUtils.push(context, '${StatisticsRouter.orderStatisticsPage}?index=$index');
          } else {
            NavigatorUtils.push(context, StatisticsRouter.goodsStatisticsPage);
          }
        },
        child: MyCard(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 16.0),
            child: Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Text(title, style: TextStyles.textBold14),
                      const LoadAssetImage('statistic/icon_selected', height: 16.0, width: 16.0)
                    ],
                  ),
                ),
                Expanded(child: LoadAssetImage('statistic/$img', fit: BoxFit.fill))
              ],
            ),
          ),
        ),
      ),
    );
  }
}