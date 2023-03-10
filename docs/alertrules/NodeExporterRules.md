# Node/System alert rules

Alert rules designed based on  Node_Exporter's metrics.   

**Alert rule configurations**: &nbsp;&nbsp;&nbsp;&nbsp; [GitHub](https://github.com/guaguafrog/noalert/blob/main/alertrules/NodeExporterRules.yml) &nbsp;&nbsp;&nbsp;&nbsp; [Gitee](https://gitee.com/guaguafrog/noalert/blob/main/alertrules/NodeExporterRules.yml)

```sh
wget https://raw.githubusercontent.com/guaguafrog/noalert/main/alertrules/NodeExporterRules.yml
```

## 1. NodeContextSwitchHigh  
**Description**
Alert when the number of context switches per core more than 2000.
This threshold is related to the application the environment is running on.Please adjust according to system operation when use.

**Metric**   
- "node_context_switches_total": Total number of context switches.   
  
**Alert rules**   
```
    - alert: NodeContextSwitchingHigh
      expr: rate(node_context_switches_total[5m])/count without(mode,cpu) (node_cpu_seconds_total{mode="idle"}) > 2000
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node context switching high (Instance:{{ $labels.instance }})
        description: "Node context switching rate more than 2000 within 5 minutes,value: {{ $labels.value }}"
```

## 2. NodeCpuCoreLoadHigh  
**Description**
Alert when CPU core load is high. 
The load of each core instead of the average of the CPU core load.

**Metric**   
- "node_cpu_seconds_total{mode="idle"}": Seconds the CPUs spent in idle mode.   
  
**Alert rules**   
```
    - alert: NodeCpuCoreLoadHigh
      expr: 100 - rate(node_cpu_seconds_total{mode="idle"}[5m])*100 > 80
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: Node cpu core load high (Instance:{{ $labels.instance }})
        description: "Node cpu core(core:{{ $labels.cpu }}) load more than 80% within 5 minutes,value: {{ $labels.value }}%"
```

## 3. NodeDisksMissing  
**Description**
Alarm when the number of hard disks is less than the threshold.
This alarm rule is often used in scenarios with multiple hard disks such as storage clusters.

**Metric**   
- "node_disk_io_now": The number of I/Os currently in progress. This is used to count the number of hard disks
  
**Alert rules**   
```
    - alert: NodeDisksMissing
      expr: count without(device) (node_disk_io_now{device=~"sd.*"}) < 1
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node disks missing (Instance:{{ $labels.instance }})
        description: "The number of hard disks is less than 1???value: {{ $labels.value }}"
```

## 4. NodeOutOfFilesystemSpace  
**Metric**   
- "node_filesystem_size_bytes": Filesystem size in bytes
- "node_filesystem_free_bytes":  Filesystem free space in bytes.
  
**Alert rules**   
```
    - alert: NodeOutOfFilesystemSpace
      expr: 100 - node_filesystem_free_bytes{mountpoint!~"/boot.*|/run.*"}/node_filesystem_size_bytes*100 > 80
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node out of filesystem space (Instance:{{ $labels.instance }})
        description: "The used space of the filesystem is more than 80%???value: {{ $labels.value }}%"
```

## 5. NodeFilesystemWillFull 
**Description**
Alert when the file system is predicted to be full within 7 days.
**Metric**   
- "node_filesystem_size_bytes": Filesystem size in bytes
- "node_filesystem_free_bytes":  Filesystem free space in bytes.
  
**Alert rules**   
```
    - alert: NodeFilesystemWillFull
      expr: 100 - predict_linear(node_filesystem_free_bytes[24h], 7*24*3600)/node_filesystem_size_bytes*100 > 90
      for: 0m
      labels:
        severity: info
      annotations:
        summary: Node filesystem will full (Instance:{{ $labels.instance }})
        description: "The file system is predicted to be full within 7 days???value: {{ $labels.value }}%"
```
## 6. NodeFilesystemReadonly 
**Metric**   
- "node_filesystem_readonly": Filesystem read-only status.
  
**Alert rules**   
```
    - alert: NodeFilesystemWillFull
      expr: node_filesystem_readonly != 0
      for: 0m
      labels:
        severity: critical
      annotations:
        summary: Node filesystem readonly (Instance:{{ $labels.instance }})
        description: "The filesystem(mountpoint:{{ $labels.mountpoint }}) is readonly"
```

## 7. NodeFilesystemDeviceError 
**Metric**   
- "node_filesystem_device_error": Whether an error occurred while getting statistics for the given device.
  
**Alert rules**   
```
    - alert: NodeFilesystemDeviceError
      expr: node_filesystem_device_error != 0
      for: 0m
      labels:
        severity: critical
      annotations:
        summary: Node filesystem device error (Instance:{{ $labels.instance }})
        description: "An error occurred while getting statistics for filesystem {{ $labels.mountpoint }} "
```

## 8. NodeOutOfFileNodes  
**Metric**   
- "node_filesystem_files": Filesystem total file nodes
- "node_filesystem_files_free":  Filesystem total free file nodes.
  
**Alert rules**   
```
    - alert: NodeOutOfFileNodes
      expr: 100 - node_filesystem_files_free/node_filesystem_files*100 > 80
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node out of filesystem file nodes (Instance:{{ $labels.instance }})
        description: "The used file nodes of the filesystem(filesystem:{{ $labels.mountpoint }}) is more than 80%???value: {{ $labels.value }}%"
```

## 9. NodeCpuLoad1High  
**Metric**   
- "node_load1": 1m load average
  
**Alert rules**   
```
    - alert: NodeLoad1High
      expr: node_load1 > 70
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: Node CPU load 1 high (Instance:{{ $labels.instance }})
        description: "Node CPU load 1 is more than 70% within 5 minutes???value:{{ $labels.value }}%"
```
## 9. NodeOutOfMemory  
**Metric**   
- "node_memory_MemAvailable_bytes": Memory information field MemAvailable_bytes.
- "node_memory_MemTotal_bytes": Memory information field MemTotal_bytes.
  
**Alert rules**   
```
    - alert: NodeOutOfMemory
      expr: 100- node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes*100 > 70
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: Node out of memory (Instance:{{ $labels.instance }})
        description: "Node memory usage more than 70% within 5 minutus???value:{{ $labels.value }}%"
```   

## 10. NodeOutOfSwapMemory  
**Metric**   
- "node_memory_SwapFree_bytes": Memory information field SwapFree_bytes.
- "node_memory_SwapTotal_bytes": Memory information field SwapTotal_bytes.
  
**Alert rules**   
```
    - alert: NodeOutOfMemory
      expr: 100 - node_memory_SwapFree_bytes/node_memory_SwapTotal_bytes*100 > 70
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: Node out of swap memory (Instance:{{ $labels.instance }})
        description: "Node swap memory usage more than 70% within 5 minutus???value:{{ $labels.value }}%"
```   

## 10. NodeNetworkTransmitErr  
**Metric**   
- "node_network_transmit_errs_total": Network device statistic transmit_errs.
  
**Alert rules**   
```
    - alert: NodeNetworkTransmitErr
      expr: rate(node_network_transmit_errs_total[5m]) > 0
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node network transmit_errs (Instance:{{ $labels.instance }})
        description: "Node network({{ $labels.device }}) have {{ $labels.value }} transmit_errs within 5 minutus"
```   

## 10. NodeNetworkTransmitDrop  
**Metric**   
- "node_network_transmit_drop_total": Network device statistic transmit_drop.
  
**Alert rules**   
```
    - alert: NodeNetworkTransmitdrop
      expr: rate(node_network_transmit_drop_total[5m]) > 0
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node network transmit_drop (Instance:{{ $labels.instance }})
        description: "Node network({{ $labels.device }}) have {{ $labels.value }} transmit_drop within 5 minutus"
```   
## NodeNetworkReceiveErr  
**Metric**   
- "node_network_receive_errs_total": Network device statistic receive_errs.
  
**Alert rules**   
```
    - alert: NodeNetworkReceiveErr
      expr: rate(node_network_receive_errs_total[5m]) > 0
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node network receive_errs (Instance:{{ $labels.instance }})
        description: "Node network({{ $labels.device }}) have {{ $labels.value }} receive_errs within 5 minutus"
```   

## NodeNetworkReceiveDrop  
**Metric**   
- "node_network_receive_drop_total": Network device statistic receive_drop.
  
**Alert rules**   
```
    - alert: NodeNetworkReceivedrop
      expr: rate(node_network_receive_drop_total[5m]) > 0
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: Node network receive_drop (Instance:{{ $labels.instance }})
        description: "Node network({{ $labels.device }}) have {{ $labels.value }} receive_drop within 5 minutus"
``` 