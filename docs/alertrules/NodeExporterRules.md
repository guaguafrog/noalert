# Node/System alert rules

Alert rules designed based on  Node_Exporter's metrics.   

**Alert rule configurations**: &nbsp;&nbsp;&nbsp;&nbsp; [GitHub](https://github.com/guaguafrog/noalert/blob/main/alertrules/NodeExporterRules.yml) &nbsp;&nbsp;&nbsp;&nbsp; [Gitee](https://gitee.com/guaguafrog/noalert/blob/main/alertrules/NodeExporterRules.yml)

```sh
wget https://raw.githubusercontent.com/guaguafrog/noalert/main/alertrules/NodeExporterRules.yml
```

## 1. NodeContextSwitchHigh  
**Metric**   
- "node_context_switches_total": Total number of context switches.   
  
**Alert rules**   
```
    - alert: NodeContextSwitchingHigh
      expr: rate(node_context_switches_total[5m])/count without(mode,cpu) (node_cpu_seconds_total{mode="idle"}) > 1000
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: node context switching high (Instance:{{ $labels.instance }})
        description: "Node context switching rate is {{ $labels.value }} within 5 minutes"
```