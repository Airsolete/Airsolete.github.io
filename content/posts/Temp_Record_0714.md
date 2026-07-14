---
title: "阶段记录"
date: 2026-07-14
draft: false
summary: "阶段性的IC仿真加速操作、注意事项"
categories: ["技术笔记"]
tags: ["Cadence"]
series: ["Cadence"]
---
# 版图设计规范

## 规范条目

* 所有信号线采用奇偶横纵/奇横偶纵
* 信号线转向尽量用45°线，尤其是高频信号线
* MOS管的Source和Drain做一层Metal，对于28nm工艺而言，Metal宽度=0.07um
* 尽量避免长信号线的堆叠，减小寄生
* VDD与VSS之间的距离应该根据流片项目整体统一

## 版图加速技巧

* 快速对齐（A）可以用二级菜单（F3）的 **User Spacing**  间隔指定距离对齐



## 后仿保存选项

* 后仿时由于电路网表中的节点很多，不要直接save all
* 在mastero中， 依次选择Outputs→Save All...→allpub改选为selected，currents选择none

![image-20260709194925480](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20260709194925480.png)

![image-20260709195052559](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20260709195052559.png)

* 然后在Outputs→To Be Saved→Select On Design，此时界面会跳转到原理图，可以选择要保存的节点

![image-20260709195325049](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20260709195325049.png)

### 在explorer界面跑仿真，不会保存过往仿真数据，要上升到assembler里面才能保存！





## Calculator-dutycycle函数

* 该函数可以用来输出波形占空比
* Plot/print vs. （cycle），横坐标不是实际时间，而是第几个周期
* Plot/print vs. （time），软件会每测一个周期，就把这个周期的 duty 画在对应的时间点上

## Calculator-floor函数

* 向下取整函数，可以向下取整，比如1.5→1，-1.5→-2





##  差分输入注意

* 记住这个原则：

如果你用**两个对地正弦源**：

```
Sine DC level = 共模电压 VCM
Amplitude = 单端峰值
```

如果你用**一个跨接差分源**：

```
Sine DC level 通常应为 0
Amplitude = 差分峰值
另外必须用电阻或电压源给 INP/INM 提供共模 VCM
```



## VA XL快捷键

![image-20260714120203243](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20260714120203243.png)

* 先M再D可以查看两点之间的dx和dy